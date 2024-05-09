import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Company } from 'src/companies/entities/company.entity';

export default class ComapnySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Company);
    await repository.save(companies);
  }
}

const companies = [
  {
    id: '6aef370c-eb00-4e64-9cb9-2f7b0b07da0e',
    displayName: 'Антон Порошкін',
    email: 'anton.poroshkin@nure.ua',
    pictureUrl:
      'https://lh3.googleusercontent.com/a/ACg8ocIf7cnk5RD2Rn5IOztk4oU-8vbH1iMDBK45bf0z-6FZxy5ERoY=s96-c',
  },
];

export const companyUuid = '6aef370c-eb00-4e64-9cb9-2f7b0b07da0e';
