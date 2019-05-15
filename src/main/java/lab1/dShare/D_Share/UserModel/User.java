package lab1.dShare.D_Share.UserModel;

import lab1.dShare.D_Share.MaterialModel.Material;
import lab1.dShare.D_Share.PrinterModel.Printer;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String password;

    @NotNull(message = "Invalid name")
    private String name;

    @Email(message = "Invalid email")
    private String email;

    @OneToMany(mappedBy = "owner", fetch = FetchType.EAGER)
    private Set<Printer> printers;

    @OneToMany (mappedBy = "owner", fetch = FetchType.EAGER)
    private Set<Material> materials;

    private double customerRating;

    private int totalCustomerRating;

    private double clientRating;

    private int totalClientRating;

    //@OneToMany(mappedBy = )


    public User(String name, String password, String email) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.totalCustomerRating = 0;
        this.totalClientRating = 0;
    }

    public User() {

    }

    public User(User user) {

    }

    public void addPrinter(Printer printer){
        printers.add(printer);
    }

    public void addMaterial(Material material){
        materials.add(material);
    }

    public double getCustomerRating() {
        return customerRating;
    }

    public int getTotalCustomerRating() {
        return totalCustomerRating;
    }

    public double getClientRating() {
        return clientRating;
    }

    public int getTotalClientRating() {
        return totalClientRating;
    }

    public void setCustomerRating(double customerRating) {
        this.customerRating = customerRating;
    }

    public void setTotalCustomerRating(int totalCustomerRating) {
        this.totalCustomerRating = totalCustomerRating;
    }

    public void setClientRating(double clientRating) {
        this.clientRating = clientRating;
    }

    public void setTotalClientRating(int totalClientRating) {
        this.totalClientRating = totalClientRating;
    }

    //Get materials by id
    public Set<Long> getMaterials() {
        Set<Long> materialsId = new HashSet<>();
        for (Material material : materials) {
            materialsId.add(material.getId());
        }
        return materialsId;
    }

    public void setMaterials(Set<Material> materials) {
        this.materials = materials;
    }

    //Get printers by Id
    public Set<Integer> getPrinters() {
        Set<Integer> printersId = new HashSet<>();
        for (Printer printer : printers) {
            printersId.add(printer.getId());
        }
        return printersId;
    }

    public void setPrinters(Set<Printer> printers) {
        this.printers = printers;
    }



    public void deletePrinter(Printer printer){
        printers.remove(printer);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setName(String name) {
        this.name = name;
    }
}

