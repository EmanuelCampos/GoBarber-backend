import IParseMailTemplateDTO from '../dtos/IParseEmailTemplateDTO'

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>
}
