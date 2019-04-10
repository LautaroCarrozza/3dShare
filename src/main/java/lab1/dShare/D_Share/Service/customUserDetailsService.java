package lab1.dShare.D_Share.Service;

import lab1.dShare.D_Share.UserModel.UserRepository;
import lab1.dShare.D_Share.UserModel.customUserDetails;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class customUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    public customUserDetailsService(UserRepository user) {
        this.userRepository = user;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new customUserDetails(userRepository.findByName(username));
    }
}
