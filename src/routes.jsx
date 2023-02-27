import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  InboxIcon,
  ArchiveBoxIcon,
  TagIcon,
  PresentationChartLineIcon,
  CpuChipIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import ProductIndex from "@/pages/dashboard/inventory/product/ProductIndex";
import CategoryIndex from "@/pages/dashboard/inventory/category/CategoryIndex";
import BoxIndex from "@/pages/dashboard/inventory/box/BoxIndex";
import ProductDetails from "@/pages/dashboard/inventory/product/ProductDetails.jsx";
import SpecificationIndex from "@/pages/dashboard/inventory/specification/SpecificationIndex";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "home",
        path: "/home",
        element: <Home />,
      },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
      // {
      //   icon: <BellIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
    ],
  },
  {
    title: "inventory",
    layout: "dashboard",
    pages: [
      {
        icon: <InboxIcon {...icon} />,
        name: "products",
        path: "/products",
        element: <ProductIndex />,
        details: {
          path: "/products/:id",
          element: <ProductDetails />,
        },
      },
      {
        icon: <TagIcon {...icon} />,
        name: "categories",
        path: "/categories",
        element: <CategoryIndex />,
      },
      {
        icon: <ArchiveBoxIcon {...icon} />,
        name: "boxes",
        path: "/boxes",
        element: <BoxIndex />,
      },
      {
        icon: <SquaresPlusIcon {...icon} />,
        name: "specifications",
        path: "/specifications",
        element: <SpecificationIndex />,
      },
    ],
  },
  {
    title: "smart lab",
    layout: "dashboard",
    pages: [
      {
        icon: <PresentationChartLineIcon {...icon} />,
        name: "real-time values",
      },
      {
        icon: <CpuChipIcon {...icon} />,
        name: "devices",
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
