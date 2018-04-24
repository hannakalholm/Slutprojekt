package com.example.logomania.Entity;

public class Word {
    private int id;
    private String name;
    private String image;
    private String audio;
    private String phoneme;
    private String position;

    public Word(){
    }

    public Word(int id, String name, String image, String audio, String phoneme, String position) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.audio = audio;
        this.phoneme = phoneme;
        this.position = position;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getImage() {
        return image;
    }
    
    public String getAudio() {
        return audio;
    }

    public String getPhoneme() {
        return phoneme;
    }

    public String getPosition() {
        return position;
    }
}

