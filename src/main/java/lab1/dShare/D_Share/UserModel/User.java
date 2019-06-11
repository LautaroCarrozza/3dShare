package lab1.dShare.D_Share.UserModel;

import lab1.dShare.D_Share.MaterialModel.Material;
import lab1.dShare.D_Share.OrderModel.Order;
import lab1.dShare.D_Share.PrinterModel.Printer;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String password;

    @NotNull(message = "Invalid name")
    private String name;

    @Email(message = "Invalid email")
    private String email;

    @OneToMany(mappedBy = "owner", fetch = FetchType.EAGER)
    private Set<Printer> printers;

    @OneToMany (mappedBy = "owner", fetch = FetchType.EAGER)
    private Set<Material> materials;

    @OneToMany (mappedBy = "client", fetch = FetchType.EAGER)
    private Set<Order> clientOrders;

    @OneToMany (mappedBy = "producer", fetch = FetchType.EAGER)
    private Set<Order> producerOrders;

    private int postalCode;

    private double customerRating;

    private int totalCustomerRating;

    private double producerRating;

    private int totalProducerRating;

    public User(String name, String password, String email, int postalCode) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.postalCode = postalCode;
        this.totalCustomerRating = 0;
        this.totalProducerRating = 0;
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


    //Orders ...

    public void addClientOrder(Order order){
        clientOrders.add(order);
    }

    public void addProducerOrder(Order order){
        producerOrders.add(order);
    }

    //Get Orders by Id
    public Set<Long> getClientOrders() {
        Set<Long> ordersId = new HashSet<>();
        for (Order order : clientOrders) {
            ordersId.add(order.getId());
        }
        return ordersId;
    }

    //Get Orders by Id
    public Set<Long> getProducerOrders() {
        Set<Long> ordersId = new HashSet<>();
        for (Order order : producerOrders) {
            ordersId.add(order.getId());
        }
        return ordersId;
    }

    public void setClientOrders(Set<Order> clientOrders) {
        this.clientOrders = clientOrders;
    }

    public void setProducerOrders(Set<Order> producerOrders) {
        this.producerOrders = producerOrders;
    }

    //Ratings..
    public double getCustomerRating() {
        return customerRating;
    }

    public int getTotalCustomerRating() {
        return totalCustomerRating;
    }

    public double getProducerRating() {
        return producerRating;
    }

    public int getTotalProducerRating() {
        return totalProducerRating;
    }

    public void setCustomerRating(double customerRating) {
        this.customerRating = customerRating;
    }

    public void setTotalCustomerRating(int totalCustomerRating) {
        this.totalCustomerRating = totalCustomerRating;
    }

    public void setProducerRating(double producerRating) {
        this.producerRating = producerRating;
    }

    public void setTotalProducerRating(int totalProducerRating) {
        this.totalProducerRating = totalProducerRating;
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

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(int postalCode) {
        this.postalCode = postalCode;
    }

    public void addRatingCustomer(){
        totalCustomerRating= totalCustomerRating+1;

    }

    public void addRatingProducer(){
        totalProducerRating=totalProducerRating+1;
    }

}


