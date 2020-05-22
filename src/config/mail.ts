interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    }
  }
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',

    defaults: {
      from: {
        email: 'emailvaiaqui@gmail.com',
        name: 'Nome Vai Aqui'
      }
    }
} as IMailConfig;
