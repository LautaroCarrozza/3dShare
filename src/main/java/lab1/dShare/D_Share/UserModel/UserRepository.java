package lab1.dShare.D_Share.UserModel;

import lab1.dShare.D_Share.PrinterModel.Printer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByName(String username);
    Set<User> getUsersByPrinters(Set<Printer> printers);
}
