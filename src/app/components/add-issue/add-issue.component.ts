import { Component, OnInit, NgZone } from '@angular/core';
import { MovieService } from '../../shared/movie.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.css'],
})
export class AddIssueComponent implements OnInit {
  issueForm!: FormGroup;
  IssueArr: any = [];

  ngOnInit() {
    this.addIssue();
  }

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public movieService: MovieService
  ) {}

  addIssue() {
    this.issueForm = this.fb.group({
      movie_id: [''],
      movie_name: [''],
    });
  }

  submitForm() {
    this.movieService.CreateMovie(this.issueForm.value).subscribe((res) => {
      console.log('Movie added!');
      this.ngZone.run(() => this.router.navigateByUrl('/issues-list'));
    });
  }
}
