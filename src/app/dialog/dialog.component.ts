import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NavigationStart, Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @ViewChild('innerComponentContainerRef', {
    read: ViewContainerRef,
    static: true,
  }) private innerComponentContainerRef: ViewContainerRef | undefined;

  width: string | undefined;
  hasBackdrop: boolean | undefined;
  innerComponent: ComponentRef<any> | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private resolver: ComponentFactoryResolver,
    private router: Router,
  ) {
    this.width = this.dialogRef._containerInstance._config.width;
    this.hasBackdrop = this.dialogRef._containerInstance._config.hasBackdrop;
    this.router.events.pipe(
      takeUntil(this.destroy$)
    ).subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.dialogRef.close();
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit() {
    if (this.data.component) {
      const factory = this.resolver.resolveComponentFactory(this.data.component);
      this.innerComponent = this.innerComponentContainerRef?.createComponent(factory);
    }
  }

  ngOnDestroy() {
    if (this.innerComponent) {
      this.innerComponent.destroy();
    }
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
