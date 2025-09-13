import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
import { Product } from 'src/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";


@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async runSeed() {
    await this.deleteTables();
    const user = await this.insertUser();
    await this.insertNewProducts(user);
    return "Run seed"
  }

  private async deleteTables() {
    await this.productsService.deleteAllProducts();
    const queryRunner = this.userRepository.createQueryBuilder();

    await queryRunner
      .delete()
      .where({})
      .execute();

  }


  private async insertUser() {
    const seedUsers = initialData.users;
    const users: User[] = [];
    seedUsers.forEach(user => {
      user.password = bcrypt.hashSync(user.password.toString(), 10);
      return users.push(this.userRepository.create(user as User));
    });
    const dbUsers = await this.userRepository.save(users);
    return dbUsers[0];
  }

  private async insertNewProducts(user: User) {
    await this.productsService.deleteAllProducts();
    const products = initialData.products;

    const insertPromises: Promise<Product>[] = [];


    products.forEach(product => {
      insertPromises.push(this.productsService.create(product, user));
    });

    await Promise.all(insertPromises);
    return true;
  }
}
