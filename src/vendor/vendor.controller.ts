import { Controller, Param, UseGuards } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../core/guards/auth.guard';

@Controller('vendor')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class VendorController {
  constructor(private vendorService: VendorService) {}

  @Get('/search/:keyword')
  searchVendor(@Param('keyword') keyword: string) {
    return this.vendorService.searchVendor(keyword);
  }

  @Get('/')
  getAllVendors() {
    return this.vendorService.getAllVendors();
  }
}
