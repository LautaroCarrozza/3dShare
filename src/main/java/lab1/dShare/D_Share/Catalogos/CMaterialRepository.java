package lab1.dShare.D_Share.Catalogos;

import org.springframework.data.repository.CrudRepository;

public interface CMaterialRepository extends CrudRepository<CatalogMaterial, Long> {

    CatalogMaterial findByName(String name);

}
