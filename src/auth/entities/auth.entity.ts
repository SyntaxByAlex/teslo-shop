import { IsBoolean, isBoolean, IsEmail } from "class-validator";
import { Product } from "src/products/entities/product.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        unique: true
    })
    email: string;

    @Column("text")
    password: string;

    @Column("text", {
        unique: true
    })
    fullName: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column()
    @Column("text", { 
        array: true,
        default: ['user']
    })
    roles: string[];

    @OneToMany(
        () => Product,
        product => product.user
    )
    product: Product

    @BeforeInsert()
    checkFields() {
        this.email = this.email.toLowerCase().trim();
        this.fullName = this.fullName.trim();
    }

    @BeforeUpdate()
    checkFieldUpdate() {
        this.checkFields();
    }
}
