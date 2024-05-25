import { Module } from '@nestjs/common'
import { ProductsModule } from 'src/products/products.module'
import { UsersModule } from 'src/users/users.module'
import { AuthModule } from 'src/auth/auth.module'
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [ProductsModule, UsersModule, AuthModule, ProfileModule],
})
export class AppModule {}
