import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'player-card',
  styleUrl: 'player-card.css',
  shadow: true,
})
export class PlayerCard {

  @Prop() name!: string;
  @Prop() team!: string;
  @Prop() league!: string;
  @Prop() imageUrl!: string;

  render() {
    return (
      <article class="card">

        {this.imageUrl && (
          <img src={this.imageUrl} alt={this.name} />
        )}

        <div class="content">

          <h2>{this.name}</h2>

          <p>
            <strong>Equipo:</strong> {this.team}
          </p>

          <p>
            <strong>Liga:</strong> {this.league}
          </p>

        </div>

      </article>
    );
  }
}