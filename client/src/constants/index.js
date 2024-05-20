import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'الرئيسية',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'بدء حملة',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'دفع',
    imgUrl: payment,
    link: '/',
    disabled: true,
  },
  {
    name: 'الصفحة الشخصية',
    imgUrl: profile,
    link: '/profile',
  },
];
