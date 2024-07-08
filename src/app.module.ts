import { Module } from '@nestjs/common'
import { ProductsModule } from 'src/products/products.module'
import { UsersModule } from 'src/users/users.module'
import { AuthModule } from 'src/auth/auth.module'
import { ProfileModule } from './profile/profile.module';
import { ClubsModule } from './clubs/clubs.module';
import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [ProductsModule, UsersModule, AuthModule, ProfileModule, ClubsModule, BrandsModule],
})
export class AppModule {}
