/* Components */
import BottomNavbar from "library/common/components/BottomNavbar";
import Navbar from "library/common/components/Navbar";

/* Ant Design */
import { Layout } from "antd";

const { Header, Footer, Content } = Layout;

function Index() {
    return (
        <>
            <Layout>
                <Header>
                    <Navbar />
                </Header>
                <Content>Content</Content>
                <Footer>
                    <BottomNavbar />
                </Footer>
            </Layout>
        </>
    );
}

export default Index;
