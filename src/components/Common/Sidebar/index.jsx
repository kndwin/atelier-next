import { useReactiveVar } from "@apollo/client";
import { Button } from "components";
import { drawerMessageVar, screenVar, userVar } from "graphql/reactiveVar";
import Link from "next/link";
import { useRouter } from "next/router";
import {useEffect} from "react";
import styles from "./styles.module.scss";

const Sidebar = () => {
  const { name, company, profile } = useReactiveVar(userVar);
	const { isAdmin } = useReactiveVar(userVar)

	useEffect(() => console.log(userVar()), [userVar])

  const router = useRouter();
  const logout = async () => {
		userVar({ ...userVar(), cookie: "", isAdmin: false });
		localStorage.removeItem("token");
    router.push("/signin");
  };

  const buttons = {
    ALL: [
      {
        name: "home",
        onClick: () => {
					router.replace('/')
        },
      },
      {
        name: "admin",
        onClick: () => {
          screenVar("CUSTOMERS");
          userVar({ ...userVar(), isAdmin: true });
        },
      },
      {
        name: "user",
        onClick: () => {
          screenVar("WORK_AREA");
          userVar({ ...userVar(), isAdmin: false });
        },
      },
      {
        name: "work area",
        onClick: () => {
          router.replace("/workarea");
          screenVar("WORK_AREA");
        },
      },
      {
        name: "dashboard",
        onClick: () => {
          router.replace("/dashboard");
        },
      },
      {
        name: "all products",
        onClick: () => {
          router.replace("/all-products");
        },
      },
      {
        name: "in production",
        notification: 2,
        onClick: () => {
          router.replace("/in-production");
        },
      },
      {
				name: `${isAdmin ? "Customer's" : "Your"} orders`,
        onClick: () => {
          router.replace("/orders");
        },
      },
    ],
  };

	return (
		<div className={styles.wrapper}>
			<div className={styles.top}>
				<img className={styles.avatar} src={profile} alt="Profile picture" />
				<p className={styles.name}>{name}</p>
				<p className={styles.company}>{company}</p>
				<a className={styles.accountSettings}
					onClick={() => {
						drawerMessageVar({...drawerMessageVar(), isOpen: false})
						router.push('/settings')
					}}
				>
					Settings
				</a>
				{buttons["ALL"].map(({ name, onClick, notification }) => (
          <div key={name} className={styles.buttonWrapper}>
            <Button
              notification={notification}
              theme="sidebar"
              width="100%"
              size="small"
              onClick={onClick}
            >
              {name}
            </Button>
          </div>
        ))}
      </div>
      <div className={styles.bottom}>
        <Button theme="sidebar" size="small" width="100%"
					onClick={() => router.replace('/contact')}
				>
          Contact
        </Button>
        <Button theme="sidebar" onClick={() => logout()} size="small" width="100%">
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
