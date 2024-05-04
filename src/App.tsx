import { ReactNode } from "react";
import "./App.css";
import { Button, buttonVariants } from "./components/ui/button";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
  NavLink,
} from "react-router-dom";
import { cn } from "./lib/utils";
import { CicleOfFifths } from "./components/CircleOfFifths";

const ROUTES = {
  HOME: "/",
  CIRCLE_OF_FIFTHS: "/circle-of-fifths",
  KEY_SIGNATURES: "/key-signatures",
  SIGHT_READING: "/sight-reading",
  AUTH: {
    LOGIN: "auth/login",
    SIGN_UP: "auth/sign-up",
  },
};

const NavLinkClassName = ({
  isActive,
}: {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
}) =>
  cn(
    buttonVariants({ variant: isActive ? "default" : "ghost" }),
    "transition-all",
  );

const Navbar = () => (
  <nav>
    <ul className="flex items-center justify-center gap-2">
      <li>
        <NavLink to={ROUTES.HOME} className={NavLinkClassName}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.CIRCLE_OF_FIFTHS} className={NavLinkClassName}>
          Circle of fifths
        </NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.KEY_SIGNATURES} className={NavLinkClassName}>
          Key signatures
        </NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.SIGHT_READING} className={NavLinkClassName}>
          Sight reading
        </NavLink>
      </li>
    </ul>
  </nav>
);

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="dark fixed inset-0 flex flex-col items-center overflow-y-scroll bg-background p-5 text-foreground">
    <header className="flex w-full items-center justify-between">
      <h1 className="w-1/3 text-start font-mono text-4xl font-bold tracking-wider">
        Learn Music
      </h1>
      <Navbar />
      <div className="flex w-1/3 items-center justify-end gap-2">
        <Link
          to={ROUTES.AUTH.LOGIN}
          className={buttonVariants({ variant: "ghost" })}
        >
          Login
        </Link>
        <Link
          to={ROUTES.AUTH.SIGN_UP}
          className={cn(buttonVariants({ variant: "default" }), "rounded-full")}
        >
          Sign up
        </Link>
      </div>
    </header>
    <hr className="my-4 h-1 w-full" />
    <main>{children}</main>
  </div>
);

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout>Home</Layout>,
  },
  {
    path: ROUTES.CIRCLE_OF_FIFTHS,
    element: (
      <Layout>
        <CicleOfFifths />
      </Layout>
    ),
  },
  {
    path: ROUTES.KEY_SIGNATURES,
    element: <Layout>Key signatures</Layout>,
  },
  {
    path: ROUTES.SIGHT_READING,
    element: <Layout>Sight reading</Layout>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
