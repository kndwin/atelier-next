import Head from "next/head";
import { Footer, Header } from "components";
import "typeface-roboto";
import { useReactiveVar } from "@apollo/client";
import {
  drawerMessageVar,
  userVar,
} from "graphql/reactiveVar";
import { useState } from "react";

import styles from "./styles.module.scss";
import Sidebar from "../Sidebar";
import AtelierIcon from "public/svg/atelier-icon.svg";
import Drawer from "../Drawer";

const Layout = (props) => {
  const { dashboard, children, seo: customSeo } = props;
  const seo = {
    title: customSeo ? customSeo.title : "Atelier",
    description: customSeo ? customSeo.description : "Beauty over bitcoin",
    image: "/favicon.ico",
  };

  const { type, size, isOpen} = useReactiveVar(drawerMessageVar);
	const [showDrawer, setShowDrawer] = useState(true);
  const { isAdmin } = useReactiveVar(userVar);
  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="image" content={seo.image} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.image} />
        <meta property="og:image:alt" content={seo.description} />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/static/favicon.ico"
        />
			</Head>
			{!!dashboard ? (
				<div className={`${styles.dashboardWrapper}`}>
					<div className={`${isOpen ? styles.threeCol : styles.twoCol}
						${size === 'LARGE' && showDrawer ? styles.large : ""}
						`}>
						<Sidebar />
            <main className={`${styles.main}`}>{children}</main>
            <AtelierIcon
							onClick={() =>(drawerMessageVar({...drawerMessageVar(), isOpen: !isOpen}))}
              className={`${styles.iconLogo}
							${isOpen ? styles.reverse : ""}
							${isAdmin ? styles.admin : ""}
					`}
            />
            <Drawer hidden={isOpen} type={type} size={size} />
          </div>
        </div>
      ) : (
        <>
          <Header />
						<main className="main-content">{children}</main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
