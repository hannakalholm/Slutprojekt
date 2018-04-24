package com.example.logomania.Controller;

import com.example.logomania.Entity.Word;
import com.example.logomania.Repository.DataRepository;
import com.example.logomania.Repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class GameController {

    @Autowired
    DataRepository dataRepository;

    @GetMapping("/test")
    @ResponseBody
    public List<Word> getRandomFiveWords(){
        List<Word> allWordsForOnePhoneme = dataRepository.getAllWordsForOnePhoneme("S");
        List<Word> fiveRandomWords = dataRepository.generateRandomFiveWords(allWordsForOnePhoneme);
        for (Word allWord : fiveRandomWords ) {
            System.out.println(allWord);

        }
        return fiveRandomWords;
    }

    //    @GetMapping("/test")
//    @ResponseBody
//    public List<Word> getAllWordsForOnePhoneme(){
//        List<Word> allWordsInJsonFormat = dataRepository.getAllWordsForOnePhoneme("S");
//        for (Word allWord : allWordsInJsonFormat) {
//            System.out.println(allWord);
//
//        }
//        return allWordsInJsonFormat;
//    }

}
