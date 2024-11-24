import { parseCookies } from "nookies";

//ICONS
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import UpdateIcon from '@mui/icons-material/Update';
import GroupsIcon from '@mui/icons-material/Groups';

const { name } = parseCookies();

let navList = [
    {
        segment: 'home',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        kind: 'divider'
    }
];

if (name === 'Admin') {
    navList.push(
        {
            segment: 'users',
            title: 'Users',
            icon: <PersonIcon />
        },
        {
            segment: 'roles',
            title: 'Roles',
            icon: <GroupsIcon />
        },
        {
            kind: 'divider'
        }
    )
}

navList.push(
    {
        kind: 'header',
        title: 'Donations',
    },
    {
        segment: 'donations',
        title: 'Lists',
        icon: <AccountBalanceWalletIcon />,
    },
    {
        segment: 'donationtypes',
        title: 'Types',
        icon: <AccountBalanceWalletIcon />,
    },
    {
        kind: 'divider'
    },
    {
        kind: 'header',
        title: 'Classes',
    },
    {
        segment: 'classtypes',
        title: 'Types',
        icon: <AssignmentIcon />,
    },
    {
        kind: 'divider'
    },
    {
        kind: 'header',
        title: 'Community',
    },
    {
        segment: 'communitytypes',
        title: 'Types',
        icon: <Diversity3Icon />,
    },
    {
        kind: 'divider'
    },
    {
        segment: 'locations',
        title: 'Locations',
        icon: <LocationOnIcon />,
    },
    {
        segment: 'periodes',
        title: 'Periodes',
        icon: <UpdateIcon />,
    },
    {
        segment: 'subjects',
        title: 'Subjects',
        icon: <MenuBookIcon />,
    }
)

export const NAVIGATION = navList;