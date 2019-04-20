package lab1.dShare.D_Share.UserModel;

import lab1.dShare.D_Share.PrinterModel.Printer;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;
    private String password;

    @NotNull(message = "Invalid username")
    private String name;

    @Email(message = "Invalid email")
    private String email;

    public String getEmail() {
        return email;
    }

    public User(String id, String name, String password) {
        this.id = id;
        this.name = name;
        this.password = password;
    }

    public User() {

    }

    public User(User user) {

    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setName(String name) {
        this.name = name;
    }
}

