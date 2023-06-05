// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  password: getIcon('password_18'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      // { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // USER
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'All Clients', path: PATH_DASHBOARD.user.list },
          // { title: 'banks', path: PATH_DASHBOARD.user.bank },
        ],
      },
    ],
  },
  // TENANTS
  // ----------------------------------------------------------------------
  {
    subheader: 'tenant',
    items: [
      // USER
      {
        title: 'tenant',
        path: PATH_DASHBOARD.tenant.root,
        icon: ICONS.user,
        children: [{ title: 'All tenants', path: PATH_DASHBOARD.tenant.list }],
      },
    ],
  },

  // ----------------------------------------------------------------------
  {
    subheader: 'tools',
    items: [
      {
        title: 'Analytics',
        path: '',
        icon: ICONS.analytics,
      },
      { title: 'Security', path: '', icon: ICONS.password },
    ],
  },
];

export default navConfig;
