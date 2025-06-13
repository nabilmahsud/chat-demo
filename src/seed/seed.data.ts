import { CreateVendorDto } from '../vendor/dto/create-vendor.dto';

export const vendorData: CreateVendorDto[] = [
  {
    category: 'IT Services',
    name: 'TechNova Solutions',
    description:
      'A leading provider of enterprise software solutions and cloud migration services.',
    emailContact: 'contact@technova.com',
  },
  {
    category: 'Office Supplies',
    name: 'PaperTrail Co.',
    description:
      'Supplies high-quality stationery, office furniture, and printing accessories for small and large businesses.',
    emailContact: 'sales@papertrail.co',
  },
  {
    category: 'Catering',
    name: 'FreshFeast Catering',
    description:
      'Specializes in corporate events, offering a wide range of gourmet food options and custom menus.',
    emailContact: 'events@freshfeast.com',
  },
  {
    category: 'Logistics',
    name: 'SwiftMove Logistics',
    description:
      'Provides national and international shipping, warehousing, and fulfillment services.',
    emailContact: 'support@swiftmove.io',
  },
  {
    category: 'Marketing',
    name: 'BrightBuzz Media',
    description:
      'A digital marketing agency focused on SEO, paid ads, and content strategy for tech startups.',
    emailContact: 'info@brightbuzzmedia.com',
  },
];

export const usersData = [
  {
    username: 'admin',
    password: '12345678',
  },
  {
    username: 'user',
    password: '12345678',
  },
];
