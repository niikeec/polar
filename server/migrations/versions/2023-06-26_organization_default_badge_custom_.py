"""organization.default_badge_custom_content

Revision ID: c72cb47114df
Revises: b392d94ec6bf
Create Date: 2023-06-26 10:15:08.469409

"""
from alembic import op
import sqlalchemy as sa


# Polar Custom Imports
from polar.kit.extensions.sqlalchemy import PostgresUUID

# revision identifiers, used by Alembic.
revision = 'c72cb47114df'
down_revision = 'b392d94ec6bf'
branch_labels: tuple[str] | None = None
depends_on: tuple[str] | None = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('organizations', sa.Column('default_badge_custom_content', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('organizations', 'default_badge_custom_content')
    # ### end Alembic commands ###
