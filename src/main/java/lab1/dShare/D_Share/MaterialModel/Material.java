package lab1.dShare.D_Share.MaterialModel;

import lab1.dShare.D_Share.UserModel.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull(message = "Invalid material name")
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "owner_id")
    private User owner;

    public Material(String name){
        this.name=name;
    }

    public Material(String name,User owner){
        this.name=name;
        this.owner=owner;
    }

    public Material(){

    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public long getOwner() {
        return owner.getId();
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
