/* Components */
import BottomNavbar from "library/common/components/BottomNavbar";
import Navbar from "library/common/components/Navbar";

/* CSS */
import "./homeStyles.scss";

/* Ant Design */
import { Layout } from "antd";

const { Header, Footer, Content } = Layout;

function Index() {
    return (
        <Layout className="layout">
            <Header>
                <Navbar />
            </Header>
            <Content>
                <div className="site-content"></div>
            </Content>
            <Footer>
                <BottomNavbar />
            </Footer>
        </Layout>
    );
}

export default Index;
