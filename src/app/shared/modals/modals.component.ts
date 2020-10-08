import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {User} from 'src/app/dto/user';
import {UserService} from 'src/app/service/user.service';

@Component({
  selector: 'um-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss'],
})
export class ModalsComponent implements OnInit {
  constructor(private readonly userService: UserService) {
  }

  @Input() show: boolean = false;
  @Input() color: String;
  @Input() name: String;
  @Output() notify = new EventEmitter<Boolean>();
  user: User;

  ngOnInit(): void {
  }

  onConfirmation() {
    this.notify.emit(true);
  }

  ngOnChanges() {
  }
}
