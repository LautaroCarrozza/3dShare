package lab1.dShare.D_Share.MaterialModel;

import org.springframework.data.repository.CrudRepository;

public interface MaterialRepository extends CrudRepository<Material,Integer> {
    Material findByName(String name);
    Material findByOwnerName(String ownerName);


}