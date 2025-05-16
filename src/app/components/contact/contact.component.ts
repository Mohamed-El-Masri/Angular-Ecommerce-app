import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface Movie {
  id: number;
  title: string;
  description: string;
  rate: number;
  imageUrl: string;
}

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  standalone: true
})
export class ContactComponent {
  newMovie: Movie = {
    id: 0,
    title: '',
    description: '',
    rate: 0,
    imageUrl: ''
  };

  movies: Movie[] = [
    { id: 1, title: 'Inception', description: 'A thief who steals corporate secrets through the use of dream-sharing technology.', rate: 8.8, imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRyuWmayVBvqjd1MxTKpRgauq2cCtUzb7Q9QvaFTkAuxAU_EYMoCE3wBuJeftxIzf0grreIw' },
    { id: 2, title: 'The Dark Knight', description: 'Batman fights the menace known as the Joker.', rate: 9.0, imageUrl: 'https://statcdn.fandango.com/MPX/image/NBCU_Fandango/448/323/thumb_8A5BA105-2C36-4E07-8B6A-3489B0400592.jpg' },
    { id: 3, title: 'Interstellar', description: 'A team of explorers travel through a wormhole in space.', rate: 8.6, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngBJ0B7UDrLUkDlp6DCQLsEYuWR-DiHwbnxFFCniB3HiP3f3NZmR1-lKSC34ge6YXu4LX' }
  ];

  searchTerm: string = '';
  selectedFile: File | null = null;
  uploadSuccess: boolean = false;
  uploadMessage: string = '';

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    
    if (this.selectedFile) {
    
      this.newMovie.imageUrl = URL.createObjectURL(this.selectedFile);
      
      this.uploadSuccess = true;
      this.uploadMessage = `Image selected: "${this.selectedFile.name}"`;
    } else {
      this.uploadSuccess = false;
      this.uploadMessage = '';
    }
  }

  addMovie() {
    if (this.newMovie.title && this.newMovie.description && this.newMovie.rate && this.newMovie.imageUrl) {
      
      const movieToAdd = {
        ...this.newMovie,
        id: this.movies.length > 0 ? Math.max(...this.movies.map(m => m.id)) + 1 : 1
      };
      
      this.movies.push(movieToAdd);
     
      this.newMovie = {
        id: 0,
        title: '',
        description: '',
        rate: 0,
        imageUrl: ''
      };
      this.selectedFile = null;
      this.uploadSuccess = false;
      this.uploadMessage = '';
    }
  }

  deleteMovie(id: number) {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movies = this.movies.filter(movie => movie.id !== id);
    }
  }

  get filteredMovies() {
    return this.movies.filter(movie => 
      movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
