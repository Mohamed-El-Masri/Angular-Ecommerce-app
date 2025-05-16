import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Track {
  name: string;
  description: string;
}

interface Branch {
  name: string;
  tracks: Track[];
}

@Component({
  selector: 'app-about',
  imports: [CommonModule, FormsModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  standalone: true
})
export class AboutComponent {
  branches: Branch[] = [
    {
      name: 'Cairo',
      tracks: [
        { name: 'Web Development', description: 'Learn modern web development technologies including HTML5, CSS3, JavaScript, and frameworks like Angular and React.' },
        { name: 'Mobile Development', description: 'Master mobile app development for iOS and Android platforms using Flutter, React Native, and native technologies.' },
        { name: 'Data Science', description: 'Discover data analysis, visualization, and machine learning techniques using Python, R, and specialized tools.' },
        { name: 'AI & Machine Learning', description: 'Learn artificial intelligence concepts, neural networks, and deep learning using TensorFlow and PyTorch.' }
      ]
    },
    {
      name: 'Alexandria',
      tracks: [
        { name: 'UI/UX Design', description: 'Create beautiful, functional user interfaces and enhance user experiences with industry-standard design principles.' },
        { name: 'Embedded Systems', description: 'Work with low-level hardware programming and develop solutions for specialized computing devices.' },
        { name: 'IoT Development', description: 'Build connected device ecosystems and smart solutions using sensors, microcontrollers, and cloud platforms.' }
      ]
    },
    {
      name: 'Mansoura',
      tracks: [
        { name: 'Network Administration', description: 'Design, implement and maintain computer networks while ensuring security, reliability, and performance.' },
        { name: 'Cyber Security', description: 'Learn defensive and offensive security techniques to protect systems from cyber attacks and vulnerabilities.' },
        { name: 'Cloud Computing', description: 'Master cloud infrastructure services and deployment models with AWS, Azure, and Google Cloud platforms.' }
      ]
    },
    {
      name: 'Assiut',
      tracks: [
        { name: 'Software Engineering', description: 'Apply engineering principles to software development through the entire software development lifecycle.' },
        { name: 'Game Development', description: 'Create immersive gaming experiences using Unity, Unreal Engine and understand game mechanics and design.' },
        { name: 'DevOps', description: 'Bridge development and operations to deliver continuous integration, delivery, and deployment pipelines.' }
      ]
    }
  ];

  selectedBranch: string = 'ALL';
  filteredTracks: {branch: string, track: Track}[] = [];

  constructor() {
    this.filterTracks();
  }

  filterTracks(): void {
    this.filteredTracks = [];
    if (this.selectedBranch === 'ALL') {
    
      this.branches.forEach(branch => {
        branch.tracks.forEach(track => {
          this.filteredTracks.push({branch: branch.name, track});
        });
      });
    } else {
    
      const branch = this.branches.find(b => b.name === this.selectedBranch);
      if (branch) {
        branch.tracks.forEach(track => {
          this.filteredTracks.push({branch: branch.name, track});
        });
      }
    }
  }

  onBranchChange(): void {
    this.filterTracks();
  }
}
