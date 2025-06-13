import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { VendorModule } from '../vendor/vendor.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [VendorModule, UserModule],
  providers: [SeedService],
})
export class SeedModule {}
