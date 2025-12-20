// src/lib/db/models/User.ts
import { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.set('toJSON', {
  transform: (_, ret: any) => {
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});

export default models.User || model<IUser>('User', UserSchema);
