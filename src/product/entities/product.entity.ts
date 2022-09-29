import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Brand } from '../../brand/entities/brand.entity';
@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Number })
  stock: number;

  @Prop()
  image: string;

  //esquema que contendrá el documento embebido, para que category tenga sub documentos uno a uno
  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }),
  )
  category: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: Brand.name }) //le pongo que es una referencia hacia brand uno a muchos
  brand: Brand | Types.ObjectId; //el objeto o el string con un id
}

export const ProductSchema = SchemaFactory.createForClass(Product);
