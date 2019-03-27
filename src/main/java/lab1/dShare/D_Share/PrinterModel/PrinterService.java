package lab1.dShare.D_Share.PrinterModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class PrinterService {

    @Autowired
    private PrinterRepository printerRepository;

    public List<Printer> getAllPrinters() {
        return StreamSupport.stream(printerRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public Printer getPrinter(String id){
        return printerRepository.findById(id).orElse(null);
    }

    public void addPrinter(Printer printer){
        printerRepository.save(printer);
    }

    public void updatePrinter(Printer user){
        printerRepository.save(user);
    }

    public void deletePrinter(String id){
        printerRepository.deleteById(id);
    }

}
