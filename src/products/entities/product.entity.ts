import { text } from "stream/consumers";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image-entity";
import { User } from "src/auth/entities/auth.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: "products"
})
export class Product {

    @ApiProperty({
        example: '12345678-1234-1234-1234-123456789012',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ApiProperty({
        example: 'Product Title',
        description: 'Product Title',
        uniqueItems: true
    })
    @Column("text", {
        unique: true
    })
    title: string

    @ApiProperty({
        example: 0,
        description: 'Product Price',
        default: 0
    })
    @Column("float", {
        default: 0
    })
    price: number

    @ApiProperty({
        example: 'Product Description',
        description: 'Product Description',
        nullable: true
    })
    @Column({
        type: "text",
        nullable: true
    })
    description: string


    @ApiProperty({
        example: 'product-title',
        description: 'Product Slug',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    slug: string

    @ApiProperty({
        example: 0,
        description: 'Product Stock',
        default: 0
    })
    @Column('int', {
        default: 0
    })
    stock: number

    @ApiProperty({
        example: ['S', 'M', 'L'],
        description: 'Product Sizes',
        isArray: true
    })
    @Column('text', {
        array: true
    })
    sizes: string[]

    @ApiProperty({
        example: 'male',
        description: 'Product Gender'
    })
    @Column({
        type: "text"
    })
    gender: string

    @ApiProperty({
        example: ['tag1', 'tag2'],
        description: 'Product Tags',
        isArray: true,
        default: []
    })
    @Column("text", {
        array: true,
        default: []
    })
    tags: string[]


    @ApiProperty({
        type: [ProductImage],
        default: [],
        example: ['https://example.com/image.jpg']
    })
    @OneToMany(
        () => ProductImage,
        productImage => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[]


    @ManyToOne(
        () => User,
        user => user.product,
        { eager: true }
    )
    user: User


    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title
        }

        this.slug = this.generateSlug()
    }

    @BeforeUpdate()
    checkSlugUpdate() {

        this.slug = this.generateSlug()
    }

    private generateSlug() {
        return this.slug
            .toLowerCase()
            .replaceAll(" ", "-")
            .replaceAll("'", "")
    }
}
