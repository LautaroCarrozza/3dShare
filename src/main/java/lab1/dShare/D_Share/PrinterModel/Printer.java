package lab1.dShare.D_Share.PrinterModel;

import lab1.dShare.D_Share.UserModel.User;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;

@Entity
public class Printer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String model;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "owner_id")
    private User owner;

    public Printer(String model) {
        this.model = model;
    }

    public Printer(String model, User owner) {
        this.model = model;
        this.owner = owner;
    }

    public Printer() {
    }

    public void setModel(String model) {
        this.model = model;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Integer getId() {
        return id;
    }

    public String getModel() {
        return model;
    }
}
