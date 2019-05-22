package lab1.dShare.D_Share.OrderModel;

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

    private boolean inProgress = false;

    public Order() {
    }

    public Order(User client, User producer) {
        this.client = client;
        this.producer = producer;
    }

    public long getId() {
        return id;
    }

    public User getClient() {
        return client;
    }

    public User getProducer() {
        return producer;
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
}
