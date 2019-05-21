package lab1.dShare.D_Share.PrinterModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class PrinterService {

    @Autowired
    private PrinterRepository printerRepository;

    public Set<Printer> getAllPrinters() {
        Set<Printer> printers = new HashSet<>();

        for (Printer printer : printerRepository.findAll()) {
            printers.add(printer);
        }
        return printers;
    }

    public Set<Printer> getPrintersForUser(Long id){
        Set<Printer> printers= new HashSet<>();

        for (Printer printer:printerRepository.findAll()) {
            if (printer.getOwner().getId().equals(id)){
                printers.add(printer);
            }
        }
        return printers;
    }

    public Printer getPrinter(Integer id){
        return printerRepository.findById(id).orElse(null);
    }

    public void addPrinter(Printer printer){
        printerRepository.save(printer);
    }

    public void updatePrinter(Printer user){
        printerRepository.save(user);
    }

    public void deletePrinter(Integer id){
        printerRepository.deleteById(id);
    }

}
