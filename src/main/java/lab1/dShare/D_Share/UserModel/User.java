package lab1.dShare.D_Share.UserModel;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
public class User {

    @Id
    private String id;
    private String password;
    private String name;


    public User(String id, String name, String password) {
        this.id = id;
        this.name = name;
        this.password = password;
    }

    public User() {

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

}

