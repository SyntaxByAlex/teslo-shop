import { IsBoolean, isBoolean, IsEmail } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
