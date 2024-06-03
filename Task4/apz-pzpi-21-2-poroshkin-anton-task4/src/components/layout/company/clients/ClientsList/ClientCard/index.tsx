import { Button, Card } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { useState } from "react"
import styles from "./styles.module.scss"
import { Client } from "@/types/clients/entities/Client"
import EditClientModal from "@/components/layout/company/clients/ClientsList/EditClientModal"
import { clientStore } from "@/store/ClientStore"

type ClientCardProps = {
    client: Client
}

export default function ClientCard({ client }: ClientCardProps) {
    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false)

    return (
        <>
            <EditClientModal
                open={isEditModalVisible}
                setOpen={setEditModalVisible}
                clientId={client.id}
            />
            <Card
                className={styles["room-card"]}
                title={client.name}
                actions={[
                    <Button
                        key="edit"
                        onClick={() => setEditModalVisible(true)}
                    >
                        <EditOutlined />
                    </Button>,
                    <Button
                        key="delete"
                        onClick={() => clientStore.delete(client.id)}
                    >
                        <DeleteOutlined />
                    </Button>,
                ]}
            >
                <div>Email: {client.email}</div>
            </Card>
        </>
    )
}

