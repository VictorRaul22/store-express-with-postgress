const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const UserService = require('./user.service');
const { config } = require('../config/config');
const service = new UserService();
class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) throw boom.unauthorized();
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw boom.unauthorized();
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }
  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }
  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) throw boom.unauthorized();
    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(payload, config.jwtRecovery, { expiresIn: '15min' });
    const link = `http://myfronted.com/recovery?token=${token}`;
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: config.mailUser, // sender address
      to: user.email, // list of receivers
      subject: 'Email para recuperar contraseña', // Subject line
      // text: 'Hola mundo', // plain text body
      html: `<b>Ingresa a este link => ${link}</b>`, // html body
    };
    const rta = await this.sendMail(mail);
    return rta;
  }
  async sendMail(infoMail) {
    let transporter = nodemailer.createTransport({
      host: config.mailHost,
      secure: true, // true for 465, false for other ports
      port: config.mailPort,
      auth: {
        user: config.mailUser,
        pass: config.mailPassword,
      },
    });
    await transporter.sendMail(infoMail);
    return {
      message: 'mail sent',
    };
  }
  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtRecovery);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) throw boom.unauthorized();
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { recoveryToken: null, password: hash });
      return { message: 'password changed' };
    } catch (err) {
      throw boom.unauthorized();
    }
  }
}
module.exports = AuthService;
