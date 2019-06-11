package lab1.dShare.D_Share.UserModel;

import lab1.dShare.D_Share.MaterialModel.Material;
import lab1.dShare.D_Share.MaterialModel.MaterialRepository;
import lab1.dShare.D_Share.OrderModel.Order;
import lab1.dShare.D_Share.OrderModel.OrderRepository;
import lab1.dShare.D_Share.OrderModel.OrderService;
import lab1.dShare.D_Share.PrinterModel.Printer;
import lab1.dShare.D_Share.PrinterModel.PrinterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PrinterRepository printerRepository;

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private OrderRepository orderRepository;

    public List<User> getAllUsers() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public User getUser(Long id){
        return userRepository.findById(id).orElse(null);
    }

    public void addUser(User user){
        if (userRepository.findByName(user.getName()) != null)
            throw new NoSuchElementException("Username already exists");
        userRepository.save(user);
    }

    public void updateUser(User user){
        userRepository.save(user);
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }

    public void addPrinter(Printer printer, User user) {
        printerRepository.save(printer);
        user.addPrinter(printer);

        //if user already exists, this updates it..
        userRepository.save(user);
    }

    public User getUserByName(String name) {
        User user = userRepository.findByName(name);
        if (user != null)
            return user;
        throw new NoSuchElementException("Invalid username");
    }

    public void addMaterial(Material material, User user) {
        materialRepository.save(material);
        user.addMaterial(material);

        //if user already exists, this updates it..
        userRepository.save(user);
    }

    public Set<User> getProducersByPrinters(Set<Printer> printers){
        return userRepository.getUsersByPrinters(printers);
    }

    //Orders...
    public void addOrder(Order order, User clientUser, User producerUser) {
        if (!order.isInProgress()){
            order.setStatus(OrderService.EVERYSTATUS[0]);
        }

        orderRepository.save(order);
        clientUser.addClientOrder(order);
        producerUser.addProducerOrder(order);

        //if user already exists, this updates it..
        userRepository.save(clientUser);
        userRepository.save(producerUser);
    }

    public void addRatingCustomer(Double rating, Long userID){
        User customer= getUser(userID);
        double clientRating= customer.getCustomerRating();
        int totalClientRatingCount= customer.getTotalCustomerRating();
        double totalRating= clientRating * totalClientRatingCount;
        totalRating=totalRating+rating;
        double finalAverage= (double) totalRating /(totalClientRatingCount+1);
        customer.setCustomerRating(finalAverage);
        customer.addRatingCustomer();



    }

    public void addRatingProducer(Double rating,long userID){
        User producer= getUser(userID);
        double producerRating= producer.getProducerRating();
        int totalProducerRating = producer.getTotalProducerRating();
        double totalRating= producerRating*totalProducerRating;
        totalRating=totalRating+totalRating;
        double finalAverage= (double) totalRating/(totalProducerRating+1);
        producer.setProducerRating(finalAverage);
        producer.addRatingProducer();

    }
}
