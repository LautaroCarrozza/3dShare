package lab1.dShare.D_Share.OrderModel;

import lab1.dShare.D_Share.MaterialModel.Material;
import lab1.dShare.D_Share.PrinterModel.Printer;
import lab1.dShare.D_Share.UserModel.User;

import javax.persistence.*;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id")
    private User client;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "producer_id")
    private User producer;

    private String material;

    private String printer;

    private boolean inProgress = false;

    public Order() {
    }

    public Order(User client, User producer, String material, String printer) {
        this.client = client;
        this.producer = producer;
        this.material = material;
    }

    public long getId() {
        return id;
    }

    public long getClient() {
        return client.getId();
    }

    public long getProducer() {
        return producer.getId();
    }

    public boolean isInProgress() {
        return inProgress;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setClient(User client) {
        this.client = client;
    }

    public void setProducer(User producer) {
        this.producer = producer;
    }

    public void setInProgress(boolean inProgress) {
        this.inProgress = inProgress;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }
}
