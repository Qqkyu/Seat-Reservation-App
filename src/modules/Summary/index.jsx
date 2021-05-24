/* React */
import React from "react";

/* Components */
import BottomNavbar from "library/common/components/BottomNavbar";
import Navbar from "library/common/components/Navbar";

/* CSS */
import "./summaryStyles.css";

/* Ant Design */
import { Layout, Result, Button } from "antd";

const { Header, Footer, Content } = Layout;

function Index() {
    return (
        <Layout className="layout">
            <Header className="navbar">
                <Navbar />
            </Header>
            <Content>
                <div className="site-content">
                    <Result
                        status="success"
                        title="Twoja rezerwacja przebiegła pomyślnie!"
                        subTitle="Wybrałeś miejsca..."
                        extra={[
                            <p>
                                Dziękujemy! W razie problemów prosimy o kontakt
                                z działem administracji.
                            </p>,
                        ]}
                    />
                </div>
            </Content>
            <Footer>
                <BottomNavbar />
            </Footer>
        </Layout>
    );
}

export default Index;
