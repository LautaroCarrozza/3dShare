package lab1.dShare.D_Share.UserModel;

import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByName(String username);
}
