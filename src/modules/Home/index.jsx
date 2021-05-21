/* Ant Design */
import { Layout } from "antd";

const { Header, Footer, Content } = Layout;

function Index() {
    return (
        <>
            <Layout>
                <Header>Header</Header>
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </Layout>
        </>
    );
}

export default Index;
